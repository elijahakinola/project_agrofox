<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_accounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('category');
            $table->string('item_type')->nullable();
            $table->string('quantity')->nullale();
            $table->string('rate')->nullable();
            $table->string('amount');
            $table->string('date');
            $table->text('comments')->nullable();
            $table->string('admin_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_accounts');
    }
}
