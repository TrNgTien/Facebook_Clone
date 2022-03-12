const METHODS = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
  };
  
  const RequestHeaders = {
    CONTENT_TYPE: "application/json;charset=utf-8",
    ACESS_CONTROLL_ALLOW_HEADERS: "*",
    ACESS_CONTROLL_ALLOW_ORIGIN: "*",
    ACESS_CONTROLL_ALLOW_METHODS: [
      METHODS.POST,
      METHODS.GET,
      METHODS.PUT,
      METHODS.DELETE,
      METHODS.OPTIONS,
    ],
  };
  
  export default RequestHeaders;
  