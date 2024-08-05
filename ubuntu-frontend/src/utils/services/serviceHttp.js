import axios from 'axios';

export class ServiceHttp {
  constructor(subRoute) {
    this._route = import.meta.env.VITE_API_BASE_URL;
    this._subRoute = subRoute;

  }

  async get(queryParams = {}) {
    try {
      const query = new URLSearchParams(queryParams).toString();
      const url = `${this._route}${this._subRoute}?${query}`; 
  
      const response = await axios.get(url); 
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getById(id, queryParams = {}) {
    try {
      const query = new URLSearchParams(queryParams).toString();
      const url = `${this._route}${this._subRoute}/${id}?${query}`; 
  
      const response = await axios.get(url); 
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put(body, id = null, token = null) {
    try {
      const url = id ? `${this._route}${this._subRoute}/${id}` : `${this._route}${this._subRoute}`;
      const response = await axios.put(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id, token = null) {
    try {
      const response = await axios.delete(`${this._route}${this._subRoute}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post(body, token = null) {
    try {
      const response = await axios.post(`${this._route}${this._subRoute}`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      console.error('Error en la respuesta de la API:', error.response.data);
    } else if (error.request) {
      console.error('Error en la solicitud a la API:', error.request);
    } else {
      console.error('Error al configurar la solicitud a la API:', error.message);
    }
    return { error: error.message || 'Error desconocido' };
  }
}
