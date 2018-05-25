package com.example.baovy.ex3;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.baovy.ex3.adapters.GradeListAdapter;

import java.util.ArrayList;

public class GradeFragment extends Fragment {

    private ArrayList<Grade> gradeArrayList;

    private Spinner spinner;
    private ListView gradeListView;

    public GradeFragment() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_grade, container, false);

        gradeArrayList = getArguments().getParcelableArrayList("list");

        spinner = (Spinner) rootView.findViewById(R.id.spinner);

        gradeListView = (ListView) rootView.findViewById(R.id.gradeListView);

        ArrayList<String> semesterName = new ArrayList<String>();
        for (int i = 0; i < gradeArrayList.size(); i++) {
            semesterName.add(gradeArrayList.get(i).getTen_hocky());
        }

        ArrayAdapter aa = new ArrayAdapter(getActivity(), android.R.layout.simple_spinner_item, semesterName);
        aa.setDropDownViewResource(android.R.layout.simple_dropdown_item_1line);
        spinner.setAdapter(aa);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                GradeListAdapter gradeListAdapter = new GradeListAdapter(getActivity(), gradeArrayList.get(Integer.parseInt(String.valueOf(parent.getItemIdAtPosition(position)))));
                gradeListView.setAdapter(gradeListAdapter);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        return rootView;
    }
}
