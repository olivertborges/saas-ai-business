ALTER TABLE "appointments" DROP CONSTRAINT "appointments_customer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "business_memberships" DROP CONSTRAINT "business_memberships_role_id_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_product_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "sales" DROP CONSTRAINT "sales_customer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "services" DROP CONSTRAINT "services_category_id_product_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "ai_approvals" ADD CONSTRAINT "ai_approvals_business_execution_fk" FOREIGN KEY ("business_id","execution_id") REFERENCES "public"."ai_executions"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_business_customer_fk" FOREIGN KEY ("business_id","customer_id") REFERENCES "public"."customers"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "automation_executions" ADD CONSTRAINT "automation_executions_business_automation_fk" FOREIGN KEY ("business_id","automation_id") REFERENCES "public"."automations"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_memberships" ADD CONSTRAINT "business_memberships_business_role_fk" FOREIGN KEY ("business_id","role_id") REFERENCES "public"."roles"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_business_customer_fk" FOREIGN KEY ("business_id","customer_id") REFERENCES "public"."customers"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_business_file_fk" FOREIGN KEY ("business_id","file_id") REFERENCES "public"."files"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "external_identities" ADD CONSTRAINT "external_identities_business_customer_fk" FOREIGN KEY ("business_id","customer_id") REFERENCES "public"."customers"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transactions" ADD CONSTRAINT "financial_transactions_business_account_fk" FOREIGN KEY ("business_id","account_id") REFERENCES "public"."finance_accounts"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transactions" ADD CONSTRAINT "financial_transactions_business_category_fk" FOREIGN KEY ("business_id","category_id") REFERENCES "public"."financial_categories"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transactions" ADD CONSTRAINT "financial_transactions_business_sale_fk" FOREIGN KEY ("business_id","sale_id") REFERENCES "public"."sales"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_business_product_fk" FOREIGN KEY ("business_id","product_id") REFERENCES "public"."products"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_business_product_fk" FOREIGN KEY ("business_id","product_id") REFERENCES "public"."products"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_business_conversation_fk" FOREIGN KEY ("business_id","conversation_id") REFERENCES "public"."conversations"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_business_sale_fk" FOREIGN KEY ("business_id","sale_id") REFERENCES "public"."sales"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_business_payment_method_fk" FOREIGN KEY ("business_id","payment_method_id") REFERENCES "public"."payment_methods"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_business_category_fk" FOREIGN KEY ("business_id","category_id") REFERENCES "public"."product_categories"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_business_content_fk" FOREIGN KEY ("business_id","content_id") REFERENCES "public"."content"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_business_supplier_fk" FOREIGN KEY ("business_id","supplier_id") REFERENCES "public"."suppliers"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_business_customer_fk" FOREIGN KEY ("business_id","customer_id") REFERENCES "public"."customers"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_business_category_fk" FOREIGN KEY ("business_id","category_id") REFERENCES "public"."product_categories"("business_id","id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ai_executions_business_id_id_unique" ON "ai_executions" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "automations_business_id_id_unique" ON "automations" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "content_business_id_id_unique" ON "content" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "conversations_business_id_id_unique" ON "conversations" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "customers_business_id_id_unique" ON "customers" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "files_business_id_id_unique" ON "files" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "finance_accounts_business_id_id_unique" ON "finance_accounts" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "financial_categories_business_id_id_unique" ON "financial_categories" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "payment_methods_business_id_id_unique" ON "payment_methods" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "product_categories_business_id_id_unique" ON "product_categories" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "roles_business_id_id_unique" ON "roles" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "sales_business_id_id_unique" ON "sales" USING btree ("business_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "suppliers_business_id_id_unique" ON "suppliers" USING btree ("business_id","id");