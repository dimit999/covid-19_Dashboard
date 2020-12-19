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

    update() {
      category.update();
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

/* это на будущее, возможно придется переделывать вовсе
const sortMethods = {
  sortAplphabet(keys, object, prop, mode) {
    const arr = keys.sort((a, b) => {
      if (mode === 1) {
        return object[b][prop].toLowerCase() < object[a][prop].toLowerCase() ? -1 : 0;
      }

      return object[b][prop].toLowerCase() > object[a][prop].toLowerCase() ? -1 : 0;
    });

    return arr;
  },

  sortNumeric(keys, object, prop, mode) {
    const arr = keys.sort((a, b) => {
      if (mode === 1) {
        return object[a][prop] - object[b][prop];
      }

      return object[b][prop] - object[a][prop];
    });

    return arr;
  },
};

export const sortObject = (object, prop, mode = 0) => {
  const newObject = {};
  const objKeys = Object.keys(object);
  const method = Number.isNaN(parseFloat(object[objKeys['0']][prop])) ? 'sortAplphabet' : 'sortNumeric';
  const keys = sortMethods[method](objKeys, object, prop, mode);

  keys.forEach((key) => {
    newObject[key] = { ...object[key] };
  });

  return newObject;
}; */
