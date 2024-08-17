import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { useEffect } from "react";

export default function Disclaimer() {
	const { theme } = useTheme()!;

	useEffect(() => {
		document.title = "Rules & Disclaimers";
	}, []);

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="flex justify-center bg-[#f7f8fc] dark:bg-slate-800 dark:text-slate-50">
				<div className="w-full lg:w-1/2 mt-5 p-2 rounded text-lg">
					<h1 className="text-2xl font-semibold bg-black dark:bg-slate-600 dark:text-slate-50 rounded text-white p-2">
						Some Rules & Disclaimers - Please Read!
					</h1>
					<div className="text-md my-5 mx-8 lg:mx-0">
						<p>
							Hiya! It's me, the developer of this full-stack, no-auth,
							note-posting site. Thanks for giving it a try! While this site is
							completely anonymous and allows you the freedom to write whatever
							you want—with some measures in place to censor profanity—I would
							still appreciate it if you try to maintain some level of maturity
							on this platform. With that being said, please keep the following
							in mind while using this site:
						</p>
						<br />
						<p>
							<strong>Posts:</strong> When you make your first post, you will
							receive a cookie that expires in one (1) week. This cookie is
							unique to you and allows you to edit and delete your own posts. If
							you manually delete this cookie, you will lose access to edit or
							delete your existing posts, and this cannot be undone. Each time
							you post, edit, or delete anything, the cookie's expiration
							extends, keeping it active. If you do not post, edit, or delete a
							post within a week, you will lose the rights to edit and delete
							your posts, even though you authored them. After a week of
							inactivity, the first new post you make will grant you a new
							session. Avoid including any personal or identifiable information
							in your posts. To prevent spamming, you are limited to ten (10)
							posts per hour, and the same limit applies to editing existing
							posts.
							<br />
							<br />
							<strong>Privacy:</strong> Your anonymity is my priority. No
							personal data is collected and your notes are not linked to any
							identifiable information. However, please avoid sharing personal
							details you may not want others to know about (even if you are
							anonymous) as post data is stored in a database and all posts are
							made public. Data stored in the database is&nbsp;
							<b>not</b> encrypted. You cannot hide or unpublish any notes you
							post.
							<br />
							<br />
							<strong>Respect:</strong> While I aim to provide a free space for
							expression, please respect others and refrain from (but not
							limited to) doxing, posting content that could be deemed
							offensive, trigging, inappropriate, harmful, or abusive.
							<br />
							<br />
							<strong>Content Moderation:</strong> To ensure a pleasant
							experience for all users, notes that contain profanity will be
							marked to deter any users who may not want to read such notes.
							While profanity is allowed, it will be censored. With that being
							said, sexual and violent content, on the other hand, is&nbsp;
							<b>prohibited</b>. Despite the measures I've implemented, some
							inappropriate content might slip through.
							<br />
							<br />
						</p>
						<p>
							<strong>Mental Health & Support:</strong> I want this space to be
							a positive and supportive environment for everyone. If you're
							feeling overwhelmed, depressed, or in crisis, please know that
							there are resources and people who can help. Your mental health is
							important, and reaching out for support is a strong and brave
							step. If you or someone you know is experiencing severe emotional
							distress or thoughts of self-harm, please contact a mental health
							professional or use one of the following resources immediately:
						</p>
						<br />
						<ul className="list-disc list-inside pl-3">
							<li>
								National Suicide Prevention Lifeline (US): Call 1-800-273-TALK
								(8255) or text HELLO to 741741 for immediate support.
							</li>
							<li>
								Samaritans (UK): Call 116 123 for confidential support at any
								time.
							</li>
							<li>
								Crisis Text Line (Canada): Text HOME to 686868 for free, 24/7
								crisis support.
							</li>
							<li>
								Lifeline (Australia): Call 13 11 14 for support and crisis
								intervention.
							</li>
						</ul>
						<br />
						<p>
							Remember, it's okay to ask for help, and you don't have to go
							through this alone. Reaching out for support can make a big
							difference. I encourage everyone to take care of themselves and
							each other. Let's create a community where support and kindness
							are at the forefront. Thank you for being a part of this.
							<br />
							<br />
							<strong>Limitations:</strong> As a simple, no-auth site, there are
							certain limitations in functionality and security. Please use the
							site responsibly.
							<br />
							<br />
							<strong>Feedback:</strong> I value your feedback and suggestions.
							If you encounter any issues or have ideas for improvement, feel
							free to reach out&nbsp;
							<Link to="/contact">
								<u className="text-blue-600 dark:text-sky-400">here</u>
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
		</div>
	);
}
