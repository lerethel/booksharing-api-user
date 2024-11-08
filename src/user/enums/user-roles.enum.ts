// The roles go from the lowest to highest to allow using native comparison
// operators during authorization. For example, "role >= UserRoles.Editor"
// will work for editors and admins but not users.
export enum UserRoles {
  User,
  Editor,
  Admin,
}
