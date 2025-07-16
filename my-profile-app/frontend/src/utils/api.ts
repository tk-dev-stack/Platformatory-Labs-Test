const API_BASE_URL = 'http://localhost:3001/api';

export const getProfile = async (email: string) => {
  const res = await fetch(`${API_BASE_URL}/profile/${email}`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const saveProfile = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save profile');
  return res.json();
};