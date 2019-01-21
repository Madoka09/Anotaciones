package com.example.lab_windows.apppropinas;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        edtCantidad = (EditText)this.findViewById(R.id.cantidad);
        btnCalcular = (Button)this.findViewById(R.id.calcular);
        txtPorcentaje = (TextView)this.findViewById(R.id.porcentaje);
        txtPropina = (TextView)this.findViewById(R.id.propina);
        txtTotal = (TextView)this.findViewById(R.id.total);

        btnCalcular.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calcularPropina();
            }
        });
    }
}
