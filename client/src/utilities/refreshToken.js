const refreshToken = async () => {
  try {
    const response = await fetch('/api/users/refresh_token', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const responseObj = await response.json();
      localStorage.setItem('act', responseObj.data.accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
