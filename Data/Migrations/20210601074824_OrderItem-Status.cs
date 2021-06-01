using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class OrderItemStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "e94f21b9-4800-401e-9011-d4aee028fd65");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "3ee539e0-7e7c-40fd-b5a4-e0ec812150b9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "b49027f7-7780-42e7-bb28-e91db03d1716");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "OrderItems");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "fa459e31-5b59-459b-8266-cda8abea8dbf");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "b31324cb-852d-436a-8c45-4e46f4c2721b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "3e713875-64d6-4456-ba66-f3b363f4ef8c");
        }
    }
}
