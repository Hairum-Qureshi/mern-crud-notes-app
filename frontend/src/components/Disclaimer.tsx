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
				<h1 className="text-2xl font-semibold bg-black rounded text-white p-2">
					Some Rules & Disclaimers - Please Read!
				</h1>
				<div className="text-md my-5">
					<p>
						Hiya! It's me, the developer of this full-stack, no-auth,
						note-posting site. Thanks for giving it a try! While this site is
						completely anonymous and allows you the freedom to write whatever
						you want—with some measures in place to censor profanity—I would
						still appreciate it if you try to maintain some level of maturity on
						this platform. With that being said, please keep the following in
						mind while using this site:
					</p>
					<br />
					<p>
						<strong>Posts:</strong> When you make your first post, you will
						receive a cookie that expires in one week. During this week, you can
						create, edit, and delete your own posts. Each time you post, the
						cookie's expiration extends, keeping it active. If you don't post
						before your cookie expires in one (1) week, you'll lose
						editing/deleting rights to your posts, even though you authored
						them. To maintain access to your posts, keep your session active by
						posting within the week. Additionally, avoid including any personal
						or identifiable information in your posts. To prevent spamming, you
						are limited to 10 posts per hour. The same goes for editing existing
						posts.
						<br />
						<br />
						<strong>Privacy:</strong> Your anonymity is my priority. No personal
						data is collected and your notes are not linked to any identifiable
						information. However, please avoid sharing personal details you may
						not want others to know about (even if you are anonymous) as post
						data is stored in a database and all posts are made public. Data
						stored in the database is&nbsp;
						<b>not</b> encrypted. You cannot hide or unpublish any notes you
						post.
						<br />
						<br />
						<strong>Respect:</strong> While I aim to provide a free space for
						expression, please respect others and refrain from posting content
						that could be deemed offensive, harmful, or abusive.
						<br />
						<br />
						<strong>Content Moderation:</strong> To ensure a pleasant experience
						for all users, notes that contain profanity will be marked to deter
						any users who may not want to read such notes. While profanity is
						allowed, it will be censored. With that being said, sexual and
						violent content, on the other hand, is <b>prohibited</b>. Despite
						the measures I've implemented, some inappropriate content might slip
						through. Feel free to report any content that violates any of these
						rules.
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
