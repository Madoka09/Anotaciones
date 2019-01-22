package com.example.lab_windows.apppropinas;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    EditText edtCantidad;
    Button btnCalcular;
    TextView txtPorcentaje;
    TextView txtPropina;
    TextView txtTotal;
    Editable cantidad;
    double internalPorcentaje;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        edtCantidad = (EditText) this.findViewById(R.id.cantidad);
        btnCalcular = (Button) this.findViewById(R.id.calcular);
        txtPorcentaje = (TextView) this.findViewById(R.id.porcentaje);
        txtPropina = (TextView) this.findViewById(R.id.propina);
        txtTotal = (TextView) this.findViewById(R.id.total);

        txtPropina.setText("10%");
        obtenerPropina();

        btnCalcular.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calcularPropina();
            }
        });
    }

    private void calcularPropina() {
        double propina;

        //CharSequence porcentaje = txtPorcentaje.getText().;
        cantidad = edtCantidad.getText();
        Double porce = Double.parseDouble(obtenerPorce());
        propina = Double.parseDouble(cantidad.toString())/100*porce;

        txtTotal.setText(String.valueOf(propina));

    }

    private void obtenerPropina(){
        SharedPreferences preferences = this.getSharedPreferences("AppPreferences", MODE_PRIVATE);
        String porcentaje = preferences.getString("PorcentajePropina", "15.0");
        txtPorcentaje.setText(String.format("%s%%", porcentaje));
    }

    private String obtenerPorce(){
        SharedPreferences preferences = this.getSharedPreferences("AppPreferences", MODE_PRIVATE);
        String porcentaje = preferences.getString("PorcentajePropina", "15.0");
        return porcentaje;
    }
}
