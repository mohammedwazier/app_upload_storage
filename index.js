const App = require("./app");

const { PORT } = require("./src/config");

App.listen(PORT, () => console.log(`Server was listen to PORT:${PORT}`));
