const auth = {
  getToken: () => sessionStorage.getItem('bearer'),
  isAuthenticated: () => sessionStorage.getItem('bearer') != null,
  store: token => {
    sessionStorage.setItem('bearer', token);
  },
  signOut: () => {
    sessionStorage.removeItem('bearer');
  },
};

export default auth;
