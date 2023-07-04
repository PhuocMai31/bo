function middleWearMqtt(...avg) {
  return async (params, c) => {
    for (let avgElement of avg) {
      params = await avgElement(params, c);

      if (!c.status) return params;
    }
  };
}

export default middleWearMqtt;
