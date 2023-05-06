import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetUser,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";

function Playlists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.user
  );
  const allPlaylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user.playlists,
  ];
  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/songs/delete-playlist",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        alert("Playlist deleted successfully");
        dispatch(SetUser(response.data.data));
        dispatch(
          SetSelectedPlaylist({
            name: "All Songs",
            songs: allSongs,
          })
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlaylists[0]));
    }
  }, [selectedPlaylist, allSongs]);

  return (
    <div>
      <div className="flex justify-between gap-3 w-full">
        <h1 className="text-secondary text-2xl">Your Playlists</h1>
        <h1
          className="underline cursor-pointer text-xl text-secondary"
          onClick={() => {
            navigate("/create-edit-playlist");
          }}
        >
          Create Playlists{" "}
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-10">
        {allPlaylists.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div
              className={`flex flex-col shadow border cursor-pointer rounded gap-1 p-2 ${
                isSelected && "border-active border-2"
              }`}
              onClick={() => {
                dispatch(SetSelectedPlaylist(playlist));
              }}
            >
              <h1 className="tex-3xl text-gray-700">{playlist?.name}</h1>
              <h1 className="text-xl">{playlist?.songs?.length} Songs</h1>
              <hr />
              <div className="flex gap-3 justify-between">
                <i
                  className="ri-delete-bin-line text-2xl  text-gray-500"
                  onClick={() => {
                    onDelete(playlist.name);
                  }}
                ></i>
                <i
                  className="ri-pencil-line text-2xl  text-gray-500"
                  onClick={() => {
                    dispatch(SetSelectedPlaylistForEdit(playlist));
                    navigate(`/create-edit-playlist`);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
