using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class OrderItemRestaurant2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Restaurants_RestaurantId",
                table: "OrderItems");

            migrationBuilder.AlterColumn<int>(
                name: "RestaurantId",
                table: "OrderItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "55c371b9-2b54-41b8-836a-0838dd721ffb");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "a94cf05f-a7df-4e25-b834-20943bf261e0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "e1a08b0d-0281-48f2-aa74-cdfec5c662ca");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Restaurants_RestaurantId",
                table: "OrderItems",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Restaurants_RestaurantId",
                table: "OrderItems");

            migrationBuilder.AlterColumn<int>(
                name: "RestaurantId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Restaurants_RestaurantId",
                table: "OrderItems",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id");
        }
    }
}
