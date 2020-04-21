const jwtDecode = require('jwt-decode');

const refreshToken = async () => {
  try {
    const response = await fetch('/api/users/refresh_token', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const { status, data } = await response.json();
      if (status === 'success') {
        const { accessToken } = data;
        // Save access token to local storage.
        localStorage.setItem('act', accessToken);
        // Create timer to refetch new token after expiration.
        const { exp } = jwtDecode(accessToken);
        setTimeout(refreshToken, exp * 1000 - Date.now());
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
