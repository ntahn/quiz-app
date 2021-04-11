import "./App.css";
import { HomePage } from "./components/HomePage";
import { useComponentWillMount } from "./hooks/useComponentWillMount";

function App() {
	useComponentWillMount(() => {
		if (localStorage.theme === "dark") {
			document.documentElement.classList.add("dark");
		}
	});
	return <HomePage />;
}

export default App;
