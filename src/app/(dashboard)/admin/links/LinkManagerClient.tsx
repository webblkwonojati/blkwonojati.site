'use client';

import { useState } from 'react';
import { addLink, toggleLinkActive, deleteLink, editLink, updateProfile } from './actions';
import { Globe, MessageSquare, Share2, ExternalLink } from 'lucide-react';

const IconMap: Record<string, any> = {
  globe: Globe,
  instagram: Globe,
  twitter: Globe,
  facebook: Globe,
  github: Globe,
  youtube: Globe,
  linkedin: Globe,
  message: MessageSquare,
  share: Share2,
};

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  is_active: boolean;
  order_index: number;
}

interface Profile {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  theme_settings: {
    background_image?: string;
    social_links?: {
      instagram?: string;
      whatsapp?: string;
      youtube?: string;
      facebook?: string;
      tiktok?: string;
    };
  };
}

export default function LinkManagerClient({ 
  initialLinks, 
  initialProfile,
  profileId 
}: { 
  initialLinks: any[], 
  initialProfile: any,
  profileId: string 
}) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [profile, setProfile] = useState<Profile>(initialProfile || {
    id: profileId,
    username: '',
    display_name: '',
    bio: '',
    avatar_url: '',
    theme_settings: {}
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'links'>('links');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState({ title: '', url: '', icon: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  async function handleAddSub(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', formState.title);
    formData.append('url', formState.url);
    formData.append('icon', formState.icon);
    formData.append('profile_id', profileId);
    
    const tempId = Math.random().toString();
    const newLink = { ...formState, id: tempId, is_active: true, order_index: links.length };
    setLinks([...links, newLink]);
    
    const res = await addLink(formData);
    if (!res.success) {
      alert('Error: ' + res.error);
      setLinks(links.filter(l => l.id !== tempId)); 
    } else {
      window.location.reload(); 
    }
    setFormState({ title: '', url: '', icon: '' });
    setIsAdding(false);
  }

  async function handleToggle(id: string, currentStatus: boolean) {
    setLinks(links.map(l => l.id === id ? { ...l, is_active: !currentStatus } : l));
    await toggleLinkActive(id, currentStatus);
  }

  async function handleDelete(id: string) {
    setLinks(links.filter(l => l.id !== id));
    await deleteLink(id);
  }

  async function handleSaveEdit(e: React.FormEvent, id: string) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', formState.title);
    formData.append('url', formState.url);
    formData.append('icon', formState.icon);
    
    setLinks(links.map(l => l.id === id ? { ...l, title: formState.title, url: formState.url, icon: formState.icon } : l));
    const res = await editLink(formData);
    if (!res.success) alert('Error saving link');
    setEditingId(null);
    setFormState({ title: '', url: '', icon: '' });
  }

  async function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSavingProfile(true);
    const formData = new FormData(e.currentTarget);
    formData.append('id', profileId);

    formData.append('instagram', profile.theme_settings.social_links?.instagram || '');
    formData.append('whatsapp', profile.theme_settings.social_links?.whatsapp || '');
    formData.append('youtube', profile.theme_settings.social_links?.youtube || '');
    formData.append('facebook', profile.theme_settings.social_links?.facebook || '');
    formData.append('tiktok', profile.theme_settings.social_links?.tiktok || '');

    const res = await updateProfile(formData);
    if (!res.success) alert('Error updating profile: ' + res.error);
    else window.location.reload();
    setIsSavingProfile(false);
  }

  function startEditing(link: Link) {
    setEditingId(link.id);
    setFormState({ title: link.title, url: link.url, icon: link.icon || '' });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* CMS EDITOR */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        
        {/* Tab Switcher */}
        <div className="flex border-b mb-6">
          <button 
            onClick={() => setActiveTab('links')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'links' ? 'border-[#13ec49] text-[#13ec49]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Links
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'profile' ? 'border-[#13ec49] text-[#13ec49]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Profile & Theme
          </button>
        </div>

        {activeTab === 'links' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Links</h2>
              <div className="flex gap-3">
                <a 
                  href="http://localhost:3001" 
                  target="_blank" 
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 flex items-center gap-2 font-medium border border-slate-200"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  View Live Page
                </a>
                <button 
                  onClick={() => { setIsAdding(true); setEditingId(null); setFormState({title: '', url: '', icon: ''}); }}
                  className="bg-[#13ec49] text-white px-4 py-2 rounded-lg hover:bg-[#11d842] flex items-center gap-2 font-medium shadow-sm shadow-primary/20"
                >
                  <span className="material-symbols-outlined">add</span>
                  Add Link
                </button>
              </div>
            </div>

            {/* Link Form */}
            {(isAdding || editingId) && (
              <form 
                onSubmit={(e) => editingId ? handleSaveEdit(e, editingId) : handleAddSub(e)}
                className="mb-8 bg-slate-50 p-6 border border-slate-200 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input required type="text" value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full border p-2 rounded-md" placeholder="e.g. Join the Academy" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input required type="text" value={formState.url} onChange={e => setFormState({...formState, url: e.target.value})} className="w-full border p-2 rounded-md" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <input required type="text" value={formState.icon} onChange={e => setFormState({...formState, icon: e.target.value})} className="w-full border p-2 rounded-md" placeholder="🌱, instagram, or https://..." />
                  <p className="text-[10px] text-slate-400 mt-1">
                    💡 <b>Tips:</b> Gunakan Emoji (🌱), Nama Ikon (<code>instagram</code>, <code>globe</code>, <code>mail</code>), atau <b>URL Link Gambar</b> langsung.
                    <br />
                    Cari nama ikon di: <a href="https://fonts.google.com/icons" target="_blank" className="text-primary underline">Google Fonts Icons</a>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-[#13ec49] text-white px-6 py-2 rounded-md font-bold">Save Link</button>
                  <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="bg-slate-200 px-6 py-2 rounded-md font-medium">Cancel</button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {links.length === 0 && <p className="text-slate-500 italic">No links added yet.</p>}
              {links.map((link) => (
                 <div key={link.id} className={`flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all ${!link.is_active ? 'opacity-50 grayscale bg-slate-50' : 'bg-white border-slate-200'}`}>
                   <div className="flex items-center gap-4">
                     <div className="material-symbols-outlined text-slate-300 cursor-grab">drag_indicator</div>
                     <div>
                        <p className="font-bold text-slate-800 flex items-center gap-2">
                          {link.id && link.icon && (
                            (() => {
                              const iconTrimmed = link.icon.trim();
                              
                              // 1. Detect Image URL
                              if (iconTrimmed.startsWith('http')) {
                                return <img src={iconTrimmed} alt="" className="size-5 object-contain" />;
                              }
                              
                              // 2. Detect Material Symbol (alphanumeric name)
                              if (/^[a-z0-9_]+$/i.test(iconTrimmed) && iconTrimmed.length < 30) {
                                return <span className="material-symbols-outlined text-[20px]">{iconTrimmed}</span>;
                              }
                              
                              // 3. Render as Emoji or Raw Text
                              return <span className="text-lg">{iconTrimmed}</span>;
                            })()
                          )}
                          {link.title}
                        </p>
                       <p className="text-xs text-slate-500 truncate max-w-[200px] md:max-w-[400px]">{link.url}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-1">
                     <button onClick={() => handleToggle(link.id, link.is_active)} className={`p-2 rounded-lg transition-colors ${link.is_active ? 'text-[#13ec49] hover:bg-[#13ec49]/10' : 'text-slate-400 hover:bg-slate-200'}`} title="Toggle Visibility">
                       <span className="material-symbols-outlined">{link.is_active ? 'visibility' : 'visibility_off'}</span>
                     </button>
                     <button onClick={() => startEditing(link)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                       <span className="material-symbols-outlined">edit</span>
                     </button>
                     <button onClick={() => handleDelete(link.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                       <span className="material-symbols-outlined">delete</span>
                     </button>
                   </div>
                 </div>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Display Name</label>
                <input 
                  type="text" 
                  name="display_name"
                  value={profile.display_name} 
                  onChange={e => setProfile({...profile, display_name: e.target.value})}
                  className="w-full border p-2 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username (@)</label>
                <input 
                  type="text" 
                  name="username"
                  value={profile.username} 
                  onChange={e => setProfile({...profile, username: e.target.value})}
                  className="w-full border p-2 rounded-md" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio / Description</label>
              <textarea 
                rows={3}
                name="bio"
                value={profile.bio} 
                onChange={e => setProfile({...profile, bio: e.target.value})}
                className="w-full border p-2 rounded-md" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Avatar URL</label>
                <input 
                  type="text" 
                  name="avatar_url"
                  value={profile.avatar_url} 
                  onChange={e => setProfile({...profile, avatar_url: e.target.value})}
                  className="w-full border p-2 rounded-md" 
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">Or Upload New Avatar</label>
                <input type="file" name="avatar_file" accept="image/*" className="w-full text-xs border border-dashed p-1.5 rounded-md" />
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Social Media Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram URL</label>
                  <input 
                    type="text" 
                    name="instagram"
                    value={profile.theme_settings.social_links?.instagram || ''} 
                    onChange={e => setProfile({...profile, theme_settings: {...profile.theme_settings, social_links: {...profile.theme_settings.social_links, instagram: e.target.value}}})}
                    className="w-full border p-2 rounded-md" 
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
                  <input 
                    type="text" 
                    name="whatsapp"
                    value={profile.theme_settings.social_links?.whatsapp || ''} 
                    onChange={e => setProfile({...profile, theme_settings: {...profile.theme_settings, social_links: {...profile.theme_settings.social_links, whatsapp: e.target.value}}})}
                    className="w-full border p-2 rounded-md" 
                    placeholder="e.g. 62812345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">YouTube Channel URL</label>
                  <input 
                    type="text" 
                    name="youtube"
                    value={profile.theme_settings.social_links?.youtube || ''} 
                    onChange={e => setProfile({...profile, theme_settings: {...profile.theme_settings, social_links: {...profile.theme_settings.social_links, youtube: e.target.value}}})}
                    className="w-full border p-2 rounded-md" 
                    placeholder="https://youtube.com/@yourchannel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">TikTok URL</label>
                  <input 
                    type="text" 
                    name="tiktok"
                    value={profile.theme_settings.social_links?.tiktok || ''} 
                    onChange={e => setProfile({...profile, theme_settings: {...profile.theme_settings, social_links: {...profile.theme_settings.social_links, tiktok: e.target.value}}})}
                    className="w-full border p-2 rounded-md" 
                    placeholder="https://tiktok.com/@yourprofile"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Theme & Appearance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-1">Background Image URL</label>
                  <input 
                    type="text" 
                    name="background_image"
                    value={profile.theme_settings.background_image || ''} 
                    onChange={e => setProfile({...profile, theme_settings: {...profile.theme_settings, background_image: e.target.value}})}
                    className="w-full border p-2 rounded-md" 
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-400">Or Upload New Background</label>
                  <input type="file" name="bg_file" accept="image/*" className="w-full text-xs border border-dashed p-1.5 rounded-md" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSavingProfile}
              className="w-full bg-[#13ec49] text-white py-3 rounded-lg font-bold hover:bg-[#11d842] transition-colors disabled:opacity-50 shadow-md shadow-primary/20"
            >
              {isSavingProfile ? 'Saving Changes...' : 'Save Profile & Appearance'}
            </button>
          </form>
        )}
      </div>

      {/* FOOTER INFO */}
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center gap-4">
        <span className="material-symbols-outlined text-primary">info</span>
        <p className="text-sm text-slate-700">
          Semua perubahan di sini akan otomatis sinkron dengan Linktree publik Anda di 
          <a href="http://localhost:3001" target="_blank" className="font-bold text-primary hover:underline ml-1">upt-blk-wonojati</a>. 
          Anda dapat melihat hasilnya langsung dengan mengklik tombol "View Live Page".
        </p>
      </div>
    </div>
  );
}
