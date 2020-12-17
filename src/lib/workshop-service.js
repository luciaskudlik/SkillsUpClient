import axios from "axios";

class WorkshopService {
  constructor() {
    // this.api  is a reusable base of the request containing the base url (baseURL)
    // of the API and the options ( `withCredentials: true` )
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/api",
      withCredentials: true,
    });
  }

  getAllWorkshops = () => {
    const pr = this.api
      .get("/workshops")
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  getUser = () => {
    const pr = this.api
      .get("/user", { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  getOneWorkshop = (id) => {
    const pr = this.api
      .get(`/workshops/${id}`)
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  signupForWorkshop = (id, userId) => {
    const pr = this.api
      .post(`/workshops/signup/${id}`, { userId })
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  getWorkshopsByCategory = (category) => {
    const pr = this.api
      .get(`/workshops/category/${category}`)
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  addOneWorkshop = (
    title,
    img,
    description,
    date,
    category,
    length,
    credits,
    maxParticipants,
    location,
    userId
  ) => {
    const pr = this.api
      .post(
        "/workshops",
        {
          title,
          img,
          description,
          date,
          category,
          length,
          credits,
          maxParticipants,
          location,
          userId,
        },
        { withCredentials: true }
      )
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  uploadImage = (uploadData) => {
    const pr = this.api
      .post("/upload", uploadData, { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  editOneWorkshop = (
    id,
    title,
    img,
    description,
    date,
    category,
    length,
    credits,
    maxParticipants,
    location,
    userId
  ) => {
    const pr = this.api
      .put(
        `/workshops/${id}`,
        {
          title,
          img,
          description,
          date,
          category,
          length,
          credits,
          maxParticipants,
          location,
          userId,
        },
        { withCredentials: true }
      )
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  deleteOneWorkshop = (id, userId) => {
    const pr = this.api
      .post(`/workshops/${id}`, { userId }, { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  cancelOneWorkshop = (id, userId) => {
    const pr = this.api
      .post(`/workshops/cancel/${id}`, { userId }, { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };
}

// Create instance (object) containing all axios calls as methods
const workshopService = new WorkshopService();

export default workshopService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
