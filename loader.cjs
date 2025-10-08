import('./src/index.js')
  .then((module) => {
    const app = module.default || module;
    // do something with app
  })
  .catch(console.error);