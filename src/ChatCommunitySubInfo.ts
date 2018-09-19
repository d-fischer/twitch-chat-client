/**
 * Information about a community gift subscription.
 */
export default interface ChatCommunitySubInfo {
	/**
	 * The display name of the gifting user.
	 */
	gifterDisplayName: string;

	/**
	 * The plan ID of the subscription.
	 *
	 * Tier 1, 2, 3 are '1000', '2000', '3000' respectively. Prime subscriptions can't be gifted.
	 */
	plan: string;
}
