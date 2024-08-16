import "../css/index.css";
import laptopImag from "../assets/laptop-image.png";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";

export default function Home() {
	const { theme } = useTheme()!;

	return (
		<div className={theme === "dark" ? "dark" : ""}>
			<div className="w-full flex flex-col bg-[#f7f8fc] dark:bg-slate-800 dark:text-slate-50 pb-10">
				<div className="w-full lg:flex">
					<div className="lg:w-1/2 w-ful items-center lg:-mt-7">
						<h1 className="lg:text-6xl text-5xl m-5 text-left lg:leading-tight font-semibold p-3">
							Your thoughts, <br />
							Your voice, easily shared without the hassle of creating an
							account.
						</h1>
						<p className="text-xl mx-10">
							Please check out&nbsp;
							<Link to="/important">
								<u className="text-blue-600 dark:text-sky-400">
									the disclaimers/rules
								</u>
							</Link>
							&nbsp;page for some important information you should know before
							making any posts.
						</p>
					</div>
					<div className="lg:w-1/2 w-full flex items-center justify-center">
						<img
							src={laptopImag}
							alt="Laptop with sticky notes on it"
							className="object-cover scale-100"
						/>
					</div>
				</div>
				<div className="flex bg-slate-200 p-5 text-2xl lg:absolute bottom-0 w-full lg:mb-0 -mb-10 h-80 dark:bg-slate-700">
					<div className="flex items-center w-full">
						<div className="w-full">
							<div
								className={
									theme === "dark"
										? `bg-gray-800 border-2 border-gray-600 rounded-lg p-4 w-full shadow-lg`
										: `bg-gray-400 border-2 border-gray-300 rounded-lg p-4 w-full shadow-lg`
								}
							>
								<h1
									className={`text-xl ${
										theme === "dark" ? "text-white" : "text-black"
									}`}
								>
									Wanna vent? Post a lengthy note&nbsp;
									<Link to="/new-note">
										<u
											className={`${
												theme === "dark"
													? "text-sky-400 hover:text-sky-300"
													: "text-blue-600 hover:text-sky-400"
											} transition-all`}
										>
											here!
										</u>
									</Link>
								</h1>
							</div>
							<div
								className={
									theme === "dark"
										? `bg-gray-800 border-2 border-gray-600 rounded-lg p-4 w-full shadow-lg mt-3`
										: `bg-gray-400 border-2 border-gray-300 rounded-lg p-4 w-full shadow-lg mt-3`
								}
							>
								<h1
									className={`text-xl ${
										theme === "dark" ? "text-white" : "text-black"
									}`}
								>
									Wanna share a quick fun fact about yourself? Post a sticky
									note&nbsp;
									<Link to="/sticky-notes">
										<u
											className={`${
												theme === "dark"
													? "text-sky-400 hover:text-sky-300"
													: "text-blue-600 hover:text-sky-400"
											} transition-all`}
										>
											here!
										</u>
									</Link>
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
