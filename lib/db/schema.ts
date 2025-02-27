import { pgTable, serial, text, timestamp, boolean, integer, decimal, pgEnum, primaryKey } from 'drizzle-orm/pg-core';

// Enums
export const paymentStatusEnum = pgEnum('payment_status', ['PENDING', 'COMPLETED', 'FAILED']);
export const paymentMethodEnum = pgEnum('payment_method', ['UPI', 'CARD', 'WALLET']);

// Users table
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

// Accounts table
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

// Sessions table
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// Verification Tokens table
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

// Authenticators table
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

// Books table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authorId: text("author_id")
    .references(() => users.id, { onDelete: "cascade" }),
  description: text("description"),
  coverImage: text("cover_image"),
  price: integer("price"),
  rating: integer("rating"),
  totalPurchases: integer("total_purchases"),
  tags: text("tags").array(),
  fileUrl: text("file_url").notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Book Metadata table
export const bookMetadata = pgTable("book_metadata", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" }),
  genre: text("genre"),
  language: text("language"),
  pageCount: integer("page_count"),
  wordCount: integer("word_count"),
});

// Marketplace table
export const marketplace = pgTable("marketplace", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  available: boolean("available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" }),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  paymentStatus: paymentStatusEnum("payment_status").notNull(),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" }),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Followers table
export const followers = pgTable("followers", {
  id: serial("id").primaryKey(),
  followerId: text("follower_id")
    .references(() => users.id, { onDelete: "cascade" }),
  followingId: text("following_id")
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Public Library table
export const publicLibrary = pgTable("public_library", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" }),
  addedByUserId: text("added_by_user_id")
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Book Collections table
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const collectionBooks = pgTable("collection_books", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id")
    .references(() => collections.id, { onDelete: "cascade" }),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" }),
  addedAt: timestamp("added_at").defaultNow(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
