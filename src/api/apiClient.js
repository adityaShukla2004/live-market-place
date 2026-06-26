// to show the time delay tha workign like real time api 

const delay = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export async function simulateRequest(
  callback
) {
  await delay(
    500 + Math.random() * 1000
  );

  return callback();
}