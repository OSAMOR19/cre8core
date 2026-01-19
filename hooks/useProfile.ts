import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/lib/types';
import { useAuth } from '@/components/providers/AuthProvider';

export function useProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setProfile(null);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                } else {
                    setProfile(data);
                }
            } catch (err) {
                console.error('Unexpected error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    return { profile, loading };
}
