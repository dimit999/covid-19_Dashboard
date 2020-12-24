// небольшой state менеджер - будет обеспечивать взаимосвязь между объектами

export const observer = () => {
  const observers = [];
  const methods = {
    subscribe(func) {
      observers.push(func);
    },

    broadcast(data) {
      observers.forEach((sub) => sub(data));
    },
  };

  return methods;
};

// посредник - будет командовать классам исполнять методы, которые в нем указаны

export const listing = (AnyClass, data = {}) => {
  const category = new AnyClass(data);
  const methods = {
    render() {
      category.render();
    },

    update(parameter = '') {
      category.update(parameter);
    },
  };

  return methods;
};

const initFetch = async (baseUrl, body) => {
  const url = baseUrl;
  const queryString = Object.keys(body).map((query) => `${query}=${body[query]}`).join('&');
  const totalData = await fetch(`${url}?${queryString}`).then((data) => data.json());

  return totalData;
};

export const fetchData = async (url, body, entry = '') => {
  const baseUrl = `${url}${entry}`;
  const data = await initFetch(baseUrl, body);

  return data;
};

export function openFullscreen(section) {
  const elem = section;
  if (elem.requestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
