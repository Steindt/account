export type User = {
	firstname?: string;
	lastname?: string;
	fullname?: string;
	username?: string;
	email?: string;
};
export type Error = {
	firstname: string[];
	lastname: string[];
	username: string[];
	email: string[];
};
export type KeycloakUser = {
	id: string;
	createdTimestamp: number;
	username: string;
	enabled: boolean;
	totp: boolean;
	emailVerified: boolean;
	firstName: string;
	lastName: string;
	email: string;
	federationLink: string;
	attributes: {
		LDAP_ENTRY_ON: string[];
		uidNumber: string[];
		aliasEmail: string[];
		LDAP_ID: string[];
		modifyTimestamp: string[];
		createTimestamp: string[];
	};
	disableableCredentialTypes: string[];
	requiredActions: string[];
	notBefore: number;
	access: {
		manageGroupMemberships: boolean;
		view: boolean;
		mapRoles: boolean;
		impersonate: boolean;
		manage: boolean;
	};
};
