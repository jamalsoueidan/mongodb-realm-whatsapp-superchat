exports = async function (body) {
  const { business_phone_number_id, flow_id } = body;

  const identity = context.values.get(business_phone_number_id);
  const request = await context.http.get({
    url: `https://graph.facebook.com/v20.0/${flow_id}?fields=id,name,categories,preview,status,validation_errors,json_version,data_api_version,data_channel_uri,whatsapp_business_account,application`,
    headers: {
      Authorization: [
        `Bearer ${context.values.get(
          `${business_phone_number_id}-access-token`
        )}`,
      ],
    },
    encodeBodyAsJSON: true,
  });

  const response = JSON.parse(request.body.text());

  if (response.error) {
    throw new Error(response.error);
  }

  return response;
};
