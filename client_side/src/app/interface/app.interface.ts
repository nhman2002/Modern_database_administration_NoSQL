export type Id = number | string;

export default interface Account {
	id: Id;
	userName: string;
	password: string;
	accessToken: string;
}
