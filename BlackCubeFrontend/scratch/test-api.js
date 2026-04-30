const { pageApi } = require('./src/lib/api');

async function test() {
  try {
    const res = await pageApi.get('home');
    console.log('Success:', res.success);
    if (res.data) {
      console.log('Data found');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

test();
