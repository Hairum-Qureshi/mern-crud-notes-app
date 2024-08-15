import {
	TextCensor,
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
	keepStartCensorStrategy,
	asteriskCensorStrategy,
	MatchPayload
} from "obscenity";

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers
});

const censor = new TextCensor().setStrategy(
	keepStartCensorStrategy(asteriskCensorStrategy())
);

function getMatchPayload(note_content: string): MatchPayload[] {
	const matches = matcher.getAllMatches(note_content);
	return matches;
}

export { matcher, censor, getMatchPayload };
