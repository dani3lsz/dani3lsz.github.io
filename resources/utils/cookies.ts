function getExpiration(expires: Date | number | undefined): string {
  if (!expires) {
    return '';
  }

  if (typeof expires === 'number') {
    const date = new Date();

    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));

    return date.toUTCString();
  }

  if (expires instanceof Date) {
    return expires.toUTCString();
  }
}

export const Cookies = {
  get(key: string): string {
    const regex = new RegExp(`(^| )${key}=([^;]+)`);
    const match = document.cookie.match(regex);

    if (match) {
      return match[2];
    }
  },

  set(key: string, val: string, opt?: { path?: string, expires?: Date | number }): void {
    const path = opt.path || '/';
    const expires = getExpiration(opt?.expires);

    document.cookie = `${key}=${val}; path=${path}; expires=${expires};`;
  },

  remove(key: string): void {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
};
