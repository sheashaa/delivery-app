using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class UpdateUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

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
                columns: new[] { "ConcurrencyStamp", "FirstName", "LastName", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "8b9431a9-ba89-4193-8729-e863c8b74bd7", "Mohamed", "Sheashaa", "ADMIN", "AQAAAAEAACcQAAAAEGhlB0W9FlUly9dojj3lg0pO1CjL2ckqw0ZWju9M4eiFuWn2Xb0GDuioE07SrT19vg==", "0c4a43c5-5470-4ead-9628-abb28b5bf7b3", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "aa3d2faa-3dd9-428d-b1c4-0a09f588c892");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "5614dae4-acb8-4151-842f-0747f0ce6377");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "464efcab-7f20-46a4-99ac-44a4003730b6");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "555EA1A2-7BEF-4018-82D8-7679F5D17D1C",
                column: "ConcurrencyStamp",
                value: "7ae72310-dc48-4b9b-b7d4-03130eeae5af");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "F6C7E8B8-A875-41C2-B441-AB933F29ABD2",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "f5f37ee4-92f7-48ea-9b70-66ecc37d21f0", "ADMIN@GMAIL.COM", "AQAAAAEAACcQAAAAEKuAdTWYd7xP6WcYZeCVf/x6EsVDTS5SHroWlOvCzSW8oVFLXQ/qKInNBxywCtfRZw==", "928881ca-0470-4132-ac8f-72635f2bd811", "admin@gmail.com" });
        }
    }
}
