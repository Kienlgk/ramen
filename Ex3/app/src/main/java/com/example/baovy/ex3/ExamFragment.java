package com.example.baovy.ex3;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.baovy.ex3.adapters.ExamListAdapter;

import java.util.ArrayList;
import java.util.List;

public class ExamFragment extends Fragment implements AdapterView.OnItemSelectedListener {

    private RecyclerView mRecyclerView;
    private ExamListAdapter mExamListAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private Spinner mHocKiSpinner;

    private ArrayList<Exam> mExamArrayList;
    private Exam mExamForAdapter;

    public ExamFragment() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_exam, container, false);

        mExamArrayList = getArguments().getParcelableArrayList("list");
        if (mExamArrayList == null) {
            Toast.makeText(getActivity(), "examArrayList is empty", Toast.LENGTH_LONG);
            return rootView;
        }

        ArrayList<String> hocKiList = new ArrayList<String>();
        for (Exam exam : mExamArrayList) {
            hocKiList.add(exam.getTen_hocky());
        }

        mHocKiSpinner = (Spinner) rootView.findViewById(R.id.fragment_exam_hoc_ki_spinner);
        ArrayAdapter<String> hocKiSpinnerAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_item, hocKiList);
        hocKiSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        mHocKiSpinner.setAdapter(hocKiSpinnerAdapter);
        mHocKiSpinner.setOnItemSelectedListener(this);

        mRecyclerView = (RecyclerView) rootView.findViewById(R.id.fragment_exam_recycler_view);
        mRecyclerView.setHasFixedSize(true);

        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);

        mExamForAdapter = mExamArrayList.get(0);
        mExamListAdapter = new ExamListAdapter(mExamForAdapter);
        mRecyclerView.setAdapter(mExamListAdapter);

        return rootView;
    }

    // Spinner callback methods
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        mExamListAdapter.changeExam(mExamArrayList.get(position));
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
