import "whatwg-fetch";
import server from "./mocks/server";
beforeAll( () => server.listen() ); // runs before the first test in a test file runs
// afterEach(() => server.resetHandlers()); // runs after each test in a test file runs
afterAll( () => server.close() ); // runs after the last test in a test file runs
