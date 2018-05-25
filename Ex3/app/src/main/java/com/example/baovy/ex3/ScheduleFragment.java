package com.example.baovy.ex3;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.baovy.ex3.adapters.ScheduleListAdapter;

import java.util.ArrayList;

public class ScheduleFragment extends Fragment implements AdapterView.OnItemSelectedListener {

    private RecyclerView mRecyclerView;
    private ScheduleListAdapter mScheduleListAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private Spinner mHocKiSpinner;

    private ArrayList<Schedule> mScheduleArrayList;
    private Schedule mScheduleForAdapter;

    public ScheduleFragment() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_schedule, container, false);

        mScheduleArrayList = getArguments().getParcelableArrayList("list");
        if (mScheduleArrayList == null) {
            Toast.makeText(getActivity(), "scheduleArrayList is empty", Toast.LENGTH_LONG);
            return rootView;
        }

        ArrayList<String> hocKiList = new ArrayList<String>();
        for (Schedule schedule : mScheduleArrayList) {
            hocKiList.add(schedule.getTen_hocky());
        }

        mHocKiSpinner = (Spinner) rootView.findViewById(R.id.fragment_schedule_hoc_ki_spinner);
        ArrayAdapter<String> hocKiSpinnerAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_item, hocKiList);
        hocKiSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        mHocKiSpinner.setAdapter(hocKiSpinnerAdapter);
        mHocKiSpinner.setOnItemSelectedListener(this);

        mRecyclerView = (RecyclerView) rootView.findViewById(R.id.fragment_schedule_recycler_view);
        mRecyclerView.setHasFixedSize(true);

        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);

        mScheduleForAdapter = mScheduleArrayList.get(0);
        mScheduleListAdapter = new ScheduleListAdapter(mScheduleForAdapter);
        mRecyclerView.setAdapter(mScheduleListAdapter);

        return rootView;
    }

    // Spinner callback methods
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        mScheduleListAdapter.changeSchedule(mScheduleArrayList.get(position));
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
