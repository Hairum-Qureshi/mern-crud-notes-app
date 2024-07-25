import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Disclaimer() {
	return (
		<div className="flex justify-center">
			<div className="w-full lg:w-1/2 mt-5 p-2 rounded text-lg">
				<Link to="/">
					<div className="flex items-center text-lg mb-2">
						<FontAwesomeIcon icon={faArrowLeftLong} />
						<h1 className="ml-2">Go Back Home</h1>
					</div>
				</Link>
				<h1 className="text-2xl font-semibold bg-black text-white p-2">
					Some Disclaimers
				</h1>
				<div className="text-md my-5">
					<p>
						Hiya, It's me, the developer of this full-stack, no auth,
						note-posting site. Thanks for giving this site a try! While this
						site is completely anonymous, so you have the freedom to write
						whatever you want (with some measures in place to censor profanity),
						I would still appreciate that you try and maintain some level of
						maturity on this platform. With that being said,
					</p>
					<br />
					<p>Please keep the following in mind while using this site:</p>
					<br />
					<p>
						<strong>Posts:</strong> As a new user, when you make your first
						post, you will get a cookie that will expire in 1 week. Within this
						week, you have the freedom to create/edit/delete posts only you have
						made. After a week, upon making a new post, you will be issued a new
						week-long cookie. All posts that were not edited/deleted prior to
						that week will no longer be able to be edited/deleted by you (even
						though you authored those posts). This is why it's really important
						you <b>do not</b> include any personal/identifiable information
						within these posts.
						<br />
						<br />
						<strong>Privacy:</strong> Your anonymity is my priority. No personal
						data is collected, and your notes are not linked to any identifiable
						information. However, please avoid sharing personal details within
						your posts.
						<br />
						<br />
						<strong>Respect:</strong> While I aim to provide a free space for
						expression, please respect others and refrain from posting content
						that could be deemed offensive, harmful, or abusive. The community's
						well-being is important.
						<br />
						<br />
						<strong>Content Moderation:</strong> To ensure a pleasant experience
						for all users, notes that contain profanity will be marked to deter
						any users who may not want to read notes containing profanity. While
						profanity is allowed, it will be censored. With that being said,
						sexual content is <b>prohibited</b>. Despite the measures I've
						implemented, some inappropriate content might slip through. Feel
						free to report any content that violates any of these rules.
						<br />
						<br />
						<strong>Limitations:</strong> As a simple, no-auth site, there are
						certain limitations in functionality and security. Please use the
						site responsibly.
						<br />
						<br />
						<strong>Feedback:</strong> I value your feedback and suggestions. If
						you encounter any issues or have ideas for improvement, feel free to
						reach out&nbsp;
						<Link to="/contact">
							<u className="text-blue-600">here</u>
						</Link>
						. Your input helps me make this site better for everyone.
						<br />
						<br />
						Thank you for understanding and I hope you enjoy this site as much
						as I enjoyed making it!
					</p>
				</div>
			</div>
		</div>
	);
}
