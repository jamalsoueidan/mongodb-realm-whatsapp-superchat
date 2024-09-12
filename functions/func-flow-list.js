exports = async function (body) {
  const { business_phone_number_id } = body;

  const identity = context.values.get(business_phone_number_id);
  const request = await context.http.get({
    url: `https://graph.facebook.com/v20.0/${identity.account_id}/flows?status=DRAFT`,
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

  return response.data;
};
