/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n": types.CreateTweetDocument,
    "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n\tquery GetAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timageURL\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t}\n\t}\n": types.GetAllTweetsDocument,
    "\n\tquery GetSignedURL($imageName: String!, $imageType: String!) {\n\t\tgetSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n\t}\n": types.GetSignedUrlDocument,
    "\n\t#graphql\n\tquery VerifyUserGoogleToken($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n": types.VerifyUserGoogleTokenDocument,
    "\n\tquery GetCurrentUser {\n\t\tgetCurrentUser {\n\t\t\tid\n\t\t\tprofileImageURL\n\t\t\temail\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\trecommendedUsers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\timageURL\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetCurrentUserDocument,
    "\n\t#graphql\n\tquery GetUserById($id: ID!) {\n\t\tgetUserById(id: $id) {\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofileImageURL\n\t\t\tfollowers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tcontent\n\t\t\t\tid\n\t\t\t\timageURL\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timageURL\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timageURL\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSignedURL($imageName: String!, $imageType: String!) {\n\t\tgetSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n\t}\n"): (typeof documents)["\n\tquery GetSignedURL($imageName: String!, $imageType: String!) {\n\t\tgetSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery VerifyUserGoogleToken($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n"): (typeof documents)["\n\t#graphql\n\tquery VerifyUserGoogleToken($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCurrentUser {\n\t\tgetCurrentUser {\n\t\t\tid\n\t\t\tprofileImageURL\n\t\t\temail\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\trecommendedUsers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\timageURL\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCurrentUser {\n\t\tgetCurrentUser {\n\t\t\tid\n\t\t\tprofileImageURL\n\t\t\temail\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\trecommendedUsers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\timageURL\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery GetUserById($id: ID!) {\n\t\tgetUserById(id: $id) {\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofileImageURL\n\t\t\tfollowers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tcontent\n\t\t\t\tid\n\t\t\t\timageURL\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\t#graphql\n\tquery GetUserById($id: ID!) {\n\t\tgetUserById(id: $id) {\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofileImageURL\n\t\t\tfollowers {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tcontent\n\t\t\t\tid\n\t\t\t\timageURL\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;