export const uploadFile = (
  data: any,
  url: string,
  method: string
): Promise<{ status: number; response: string }> => {
  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.open(method, url);

    xhr.send(data);

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ status: xhr.status, response: xhr.responseText });
      } else {
        reject({
          status: xhr.status,
          response: xhr.responseText,
        });
      }
    };
  });
};
