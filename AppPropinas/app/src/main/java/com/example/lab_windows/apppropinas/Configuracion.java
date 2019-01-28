package com.example.lab_windows.apppropinas;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class Configuracion extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_configuracion);
    }

    protected void guardarPropina(){
        SharedPreferences preferences =
                this.getSharedPreferences("AppPrefernces", MODE_PRIVATE);
        SharedPreferences.Editor prefEditor = preferences.edit();
        prefEditor.putString("porcentajePropina", edtPropina.getText().toString());
        prefEditor.commit();
        this.finish();
    }
}
