## Make sure you can get a token with the correct chat scopes

A few months ago, Twitch added the new chat scopes `chat:read` and `chat:edit` which removed support of the `chat_login` scope for client IDs that were created after this change. The client now defaults to requesting `chat:read` and (if you don't set the other new option `readOnly`) `chat:edit`. If you need to use `chat_login` instead (because you use an old client ID), you need to set the option `legacyScopes`.

This option is now necessary because the core client was made stricter in terms of requesting scopes on a token that can't get any scope upgrades.
