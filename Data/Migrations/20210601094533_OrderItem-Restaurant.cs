using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class OrderItemRestaurant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RestaurantId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "1b519f6a-e1af-4ac8-9b0e-725b35b15630");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "7f153e90-3610-4279-8b23-61e32632506f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "02fcff60-0517-42fa-9ec4-710c7dc6470f");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_RestaurantId",
                table: "OrderItems",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Restaurants_RestaurantId",
                table: "OrderItems",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Restaurants_RestaurantId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_RestaurantId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "OrderItems");

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
    }
}
