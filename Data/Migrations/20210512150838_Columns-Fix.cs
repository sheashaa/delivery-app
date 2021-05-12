using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class ColumnsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "Orders",
                newName: "Address");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "eac741d6-7ffd-43eb-8e39-6b0f82647fb1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "0fea127f-4e37-4072-88d5-dac5f6c83e76");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "928be12a-6848-4a17-8b27-42ec18d6a8c7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "555EA1A2-7BEF-4018-82D8-7679F5D17D1C",
                column: "ConcurrencyStamp",
                value: "4c6d5f1a-779d-473a-8e16-0ef273808422");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "F6C7E8B8-A875-41C2-B441-AB933F29ABD2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "90f84444-7a07-4e88-80df-dce58e591214", "AQAAAAEAACcQAAAAEJarlNYQ1gdCTqARYJ+aLz2A60Fn4YML20vjVwnKFUPVaUkk076Uc7DdtXU1NkyeYw==", "89d3c2e4-4700-43ad-b1b9-31dfa3b5ece3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Orders",
                newName: "Adress");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "e812fb4d-26d8-4d96-9504-056640609028");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "4ce60c50-76ea-4cc2-90ef-4e2af19b3a6d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "ab78a377-7645-4e6c-bf1d-403a1da85b1a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "555EA1A2-7BEF-4018-82D8-7679F5D17D1C",
                column: "ConcurrencyStamp",
                value: "c69907fe-9556-4f31-b643-7994c56cd102");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "F6C7E8B8-A875-41C2-B441-AB933F29ABD2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8b9431a9-ba89-4193-8729-e863c8b74bd7", "AQAAAAEAACcQAAAAEGhlB0W9FlUly9dojj3lg0pO1CjL2ckqw0ZWju9M4eiFuWn2Xb0GDuioE07SrT19vg==", "0c4a43c5-5470-4ead-9628-abb28b5bf7b3" });
        }
    }
}
