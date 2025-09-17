<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimulationResult extends Model
{
    use HasFactory;

    protected $table = 'simulation_results';
    public $timestamps = true;
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'borrowing_capacity',
        'debt_ratio',
        'total_project_cost',
        'total_credit_cost',
        'estimated_monthly_payment',
    ];

    protected $casts = [
        'borrowing_capacity' => 'decimal:2',
        'debt_ratio' => 'decimal:2',
        'total_project_cost' => 'decimal:2',
        'total_credit_cost' => 'decimal:2',
        'estimated_monthly_payment' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
