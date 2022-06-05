let gun;
let user;

if (typeof window !== 'undefined' && typeof window.Gun !== 'undefined') {
  gun = window.Gun();
  user = gun.user().recall({ sessionStorage: true });
}

export { gun, user };
