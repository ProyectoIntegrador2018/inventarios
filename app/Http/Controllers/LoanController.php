<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Device;
use App\Loan;
use App\State;

use DB;

use Carbon\Carbon;

class LoanController extends Controller
{
    public function createLoan(Request $request){

        $model            = $request->input('model');

        $quantity         = $request->input('quantity');

        $reason           = $request->input('reason');
        $dates            = $request->input('dates');
        
        $applicant        = $request->input('applicant');
        $applicantID      = $request->input('applicantID');
        $email            = $request->input('email');
        $bachelor         = $request->input('bachelor');
        
        $responsableName  = $request->input('responsableName');
        $responsableEmail = $request->input('responsableEmail');

        $isStudent = $request->input('isStudent');

        // echo $model . "-" . $quantity . "-" . $reason . "-" . $dates . "-" . $applicant . "-" . $applicantID . "-" . $email . "-" . $bachelor . "-" . $responsableName . "-" .$responsableEmail;

        // Values needed to create a loan:
        // Verify before that there are enough devices available from that model
        /*
            Order of instances creation:
            1º - Applicant
            ---->name
            ---->email
            ---->applicant_id
            ---->degree
            2º - Loan
            ---->start_date
            ---->end_date
            ---->loan_date
            ---->return_date
            ---->status
            ---->reason
            ---->applicant_id
            3º - Responsable (In the case of existing)
            ---->name
            ---->email
            ---->responsable_id
            ---->applicant_id
            4º - Loan-Device
            loan_id
            device_id
        */

        
        $modelAvailability = DB::select("
            SELECT COUNT(d.model) as quantity
            FROM devices d JOIN states s
            ON d.id = s.device_id
            WHERE d.model = '$model' AND s.state = 'Available'
            GROUP BY d.model;
        ");

        $modelAvailability = $modelAvailability[0]->quantity;

        if($modelAvailability > 0){
            // There is at least one available
            if($quantity <= $modelAvailability){
                // There are enough devices to create the loan
                
                // Applicant creation
                // Responsable creation
                // Loan creation
                // Loan - Device
                // State of the device (To 'Reserved')
                DB::table('applicants')->insert(
                    [
                        'name'         => $applicant,
                        'email'        => $email,
                        'applicant_id' => $applicantID,
                        'degree'       => $bachelor,
                        'created_at'   => Carbon::now(),
                        'updated_at'   => Carbon::now()
                    ]
                );

                $lastApplicantID = DB::table('applicants')->orderBy('id', 'desc')->first();
                $lastApplicantID = $lastApplicantID->id;

                if($isStudent == true){
                    // responsable_id is going to be null at the moment
                    DB::table('responsables')->insert(
                        [
                            'name'           => $responsableName,
                            'email'          => $responsableEmail,
                            'responsable_id' => "",
                            'applicant_id'   => $lastApplicantID,
                            'created_at'     => Carbon::now(),
                            'updated_at'     => Carbon::now()
                        ]
                    );
                }

                $dates = explode("-", $dates);

                DB::table('loans')->insert(
                    [
                        'start_date'   => Carbon::parse($dates[0]),
                        'end_date'     => Carbon::parse($dates[1]),
                        'loan_date'    => Carbon::now(),
                        'return_date'  => Carbon::parse($dates[1]),
                        'status'       => 'New',
                        'reason'       => $reason,
                        'applicant_id' => $lastApplicantID,
                        'created_at'   => Carbon::now(),
                        'updated_at'   => Carbon::now()
                    ]
                );
                
                $lastLoanID = DB::table('loans')->orderBy('id', 'desc')->first();
                
                // Obtener los n elementos dependiendo de la cantidad y el modelo
                // Crear las relaciones Loan - Device
                // Cambiar los estados de los dispositivos a 'Reserved'

                $devicesToReserve = DB::select("
                    SELECT d.*
                    FROM devices d JOIN states s
                    ON d.id = s.device_id
                    WHERE d.model = '$model' AND s.state = 'Available'
                    LIMIT '$quantity';
                ");

                for($x = 0; $x < $quantity; $x++) {
                    
                    DB::table('loan_device')->insert(
                        [
                            'loan_id'        => $lastLoanID->id,
                            'device_id'      => $devicesToReserve[$x]->id,
                            'created_at'     => Carbon::now(),
                            'updated_at'     => Carbon::now()
                        ]
                    );

                    $lastLoanDeviceID = DB::table('loan_device')->orderBy('id', 'desc')->first();

                    State::where('device_id', $lastLoanDeviceID->device_id)->update(['state' => "Reserved"]);
                }
                
                $response["status"] = 1;
                $response["message"] = "Loan and all its dependencies were correctly created.";
                return json_encode($response);

            }else{
                // There are no enough devices to create the loan
                $response["status"] = 2;
                $response["message"] = "There are no enough devices to create the loan";
                return json_encode($response);
            }
        }else{
            // There is no one available
            $response["status"] = 2;
            $response["message"] = "There is no devices available of that model";
            return json_encode($response);
        }
        
        
        // $dates = explode("-", $dates);
        // $response["status"] = 1;
        // $response["message"] = Carbon::parse($dates[1]);
        // return json_encode($response);

        $response["status"] = 3;
        $response["message"] = "Nothing is happening";
        return json_encode($response);
    }
}