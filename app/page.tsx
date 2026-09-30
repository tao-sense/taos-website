import HomePage, { metadata } from "./home/page";

export { metadata };

// Must be declared here too: Next reads route config from this file.
export const revalidate = 60;

export default HomePage;
