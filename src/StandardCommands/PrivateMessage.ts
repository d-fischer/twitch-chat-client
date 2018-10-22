import { PrivateMessage } from 'ircv3/lib/Message/MessageTypes/Commands/';
import ChatUser from '../ChatUser';
import ChatClient from '../ChatClient';
import ChatTools from '../Toolkit/ChatTools';

export interface MessageCheermote {
	name: string;
	amount: number;
	position: number;
}

class TwitchPrivateMessage extends PrivateMessage {
	protected _client!: ChatClient;

	get userInfo() {
		return new ChatUser(this._prefix!.nick, this._tags, this._client);
	}

	get channelId() {
		if (!this._tags) {
			return null;
		}
		return this._tags.get('room-id') || null;
	}

	get isCheer() {
		if (!this._tags) {
			return false;
		}

		return this._tags.has('bits');
	}

	get totalBits() {
		if (!this._tags) {
			return 0;
		}

		return Number(this._tags.get('bits'));
	}

	async getSeparateBits() {
		const result: MessageCheermote[] = [];

		if (this.isCheer && this.channelId) {
			const cheermotes = await this._client._twitchClient.bits.getCheermotes(this.channelId);
			const names = cheermotes.getPossibleNames();
			const re = /(?<=^|\s)([a-z]+)(\d+)(?=\s|$)/gi;
			let match: RegExpExecArray | null;
			let totalAmount = 0;
			// tslint:disable-next-line:no-conditional-assignment
			while (match = re.exec(this.params.message)) {
				const name = match[1].toLowerCase();
				const amount = Number(match[2]);
				if (names.includes(name)) {
					result.push({
						name,
						amount,
						position: match.index
					});
					totalAmount += amount;
				}
			}

			if (totalAmount !== this.totalBits) {
				console.warn(`Incorrect amount of total bits: expected ${this.totalBits}, got ${totalAmount}`);
			}
		}

		return result;
	}

	get emoteOffsets() {
		if (!this._tags) {
			return new Map;
		}

		return ChatTools.parseEmotes(this._tags.get('emotes'));
	}
}

export default TwitchPrivateMessage;
